import { useState } from "react";
import { useAuthFetch } from "./useAuthFetch"

export interface StreakResponse {
    currentStreak: number,
    lastStreakDate: Date,
    longestStreak: number,
    affirmations: string[],
}

export interface StreakPayload {
    currentStreak: number,
    longestStreak: number,
    content: string,
}

export const useStreaks = () => {
    const { authFetch } = useAuthFetch();
    const [streaksLoading, setStreaksLoading] = useState<boolean>();
    const [streakResponseData, setStreakResponseData] = useState<StreakResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const serverUrl = 'http://localhost:8080';

    const getStreakInfo = async () => {
        setStreaksLoading(true);
        setError(null); 
        try {
            const data = await authFetch(`${serverUrl}/get_user_streak`, {
                method: 'get',
            })

            

            const res: StreakResponse = {
                currentStreak: data.current_streak,
                lastStreakDate: new Date(data.last_streak_date),
                longestStreak: data.longest_streak,
                affirmations: data.affirmations,
            }

            res.affirmations = res.affirmations.filter(str => str !== '');

            setStreakResponseData(res);
            console.log(res);
        }
        catch (error) {
            console.log(error);
            setError("Failed to fetch streak information.");
        }
        finally {
            setStreaksLoading(false);
        }
    }

    const checkIfSameAffirmation = (affirmation: string) => {   
        if (streakResponseData != null) {
            for (var i = 0; i < streakResponseData.affirmations.length; i++) {
                if (affirmation === streakResponseData.affirmations[i])
                    return true; 
            }
        }

        return false;
    }

    const uploadStreakInfo = async (payload: StreakPayload) => {
        setStreaksLoading(true);
        setError(null);
        try {
            const data = await authFetch(`${serverUrl}/update_user_streak`, {
                method: "post",
                data: {
                    current_streak: payload.currentStreak,
                    longest_streak: payload.longestStreak,
                    content: payload.content,
                },
            });

            const result = data.result.success;
            if (!result) throw new Error("Failed to submit records.");

            var newAffirmations = [ payload.content, ... streakResponseData?.affirmations || []]
            newAffirmations.pop();

            // Update local state after successful upload
            setStreakResponseData((prev) => ({
                ...prev!,
                currentStreak: payload.currentStreak,
                longestStreak: payload.longestStreak,
                affirmations: newAffirmations,
            }));
        } catch (error) {
            console.log(error);
            setError("Failed to update streak information.");
        } finally {
            setStreaksLoading(false);
        }
    };

    return { getStreakInfo, uploadStreakInfo, checkIfSameAffirmation, setStreakResponseData, streakResponseData, streaksLoading, error};
}
import { useState } from "react";
import { useAuthFetch } from "./useAuthFetch"

export interface AffirmationHistoryItem {
    content: string,
    createdAt: Date,
}

export interface AffirmationHistoryRepsonse {
    items: AffirmationHistoryItem[];
}

export interface AffirmationPayload {
    content: string,
    createdAt: Date,
}

export const useGenAffirmations = () => {
    const { authFetch } = useAuthFetch();
    const [affirmationsLoading, setAffirmationsLoading] = useState<Boolean>(); 
    const [affirmationHistoryResponseData, setAffirmationHistoryResponseData] = useState<AffirmationHistoryRepsonse | null>(null);

    const serverUrl = 'http://localhost:8080';

    const getAffirmationHistory = async () => {
        setAffirmationsLoading(true);
        try {
            const data = await authFetch(`${serverUrl}/get_generated_history`, {
                method: 'get',
            })

            var historyItems: AffirmationHistoryItem[] = [];
            for (var i = 0; i < data.items.length; i++) {
                const item = data.items[i];
                historyItems.push({
                    content: item.content,
                    createdAt: new Date(item.created_at),
                })
            }

            var affirmations: AffirmationHistoryRepsonse = {
                items: historyItems
            };

            setAffirmationHistoryResponseData(affirmations);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setAffirmationsLoading(false);
        }
    }

    const sendNewAffirmation = async (payload: AffirmationPayload) => {
        setAffirmationsLoading(true);
        try {
            const data = await authFetch(`${serverUrl}/store_generated_affirmation`, {
                method: 'post',
                data: {
                    content: payload.content,
                    created_at: payload.createdAt.toISOString().split(".")[0],
                }
            })

            const result = data.result.success;
            if (!result)
                throw new Error("failed to submit records"); 

            setAffirmationHistoryResponseData((prev) => ({
                ...prev!,
                items: [ { content: payload.content, createdAt: payload.createdAt }, ...(prev?.items || []) ]
            }));
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setAffirmationsLoading(false);
        }
    }

    return { getAffirmationHistory, sendNewAffirmation, affirmationsLoading, affirmationHistoryResponseData }
}
import { useState } from "react";
import { useAuthFetch } from "./useAuthFetch"

export interface MailAffirmationHistoryItem {
    content: string,
    sentAt: Date,
}

export interface MailAffirmationHistoryRepsonse {
    items: MailAffirmationHistoryItem[];
}

export interface MailAffirmationPayload {
    content: string,
    sentAt: Date,
}

export const useMailAffirmations = () => {
    const { authFetch } = useAuthFetch();
    const [affirmationsMailLoading, setAffirmationsMailLoading] = useState<Boolean>(); 
    const [affirmationMailResponseData, setAffirmationMailResponseData] = useState<MailAffirmationHistoryRepsonse | null>(null);

    const serverUrl = 'http://localhost:8080';

    const getAffirmationMail = async () => {
        setAffirmationsMailLoading(true);
        try {
            const data = await authFetch(`${serverUrl}/get_all_user_affirmations`, {
                method: 'get',
            })

            var historyItems: MailAffirmationHistoryItem[] = [];
            for (var i = 0; i < data.items.length; i++) {
                const item = data.items[i];
                historyItems.push({
                    content: item.content,
                    sentAt: new Date(item.sent_at),
                })
            }

            var affirmations: MailAffirmationHistoryRepsonse = {
                items: historyItems
            };

            setAffirmationMailResponseData(affirmations);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setAffirmationsMailLoading(false);
        }
    }

    const sendNewMailAffirmation = async (payload: MailAffirmationPayload) => {
        setAffirmationsMailLoading(true);
        try {
            const data = await authFetch(`${serverUrl}/send_user_affirmation`, {
                method: 'post',
                data: {
                    content: payload.content,
                    sent_at: payload.sentAt.toISOString().split(".")[0],
                }
            })

            const result = data.result.success;
            if (!result)
                throw new Error("failed to submit records"); 
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setAffirmationsMailLoading(false);
        }
    }

    return { getAffirmationMail, sendNewMailAffirmation, affirmationsMailLoading, affirmationMailResponseData }
}
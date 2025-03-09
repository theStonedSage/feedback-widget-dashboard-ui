export const useValidateQuestionsPayload = () => {
    return (payload: any) => {
        if(!payload.label){
            return {
                isValid: false,
                message: "label is required"
            }
        }
        if(!payload.type){
            return {
                isValid: false,
                message: "type is required"
            }
        }
        if(payload.type === 'mcq' && payload.options?.length === 0){
            return {
                isValid: false,
                message: "Options are required for type mcq"
            }
        }
        return {
            isValid: true
        }
    }
}
import { tradeType } from "@/api/common/constant"
const tradeTypes = tradeType();
export const proTradeType = (val)=>{
    return tradeTypes.find(item=>item.id===val)?.desc
}
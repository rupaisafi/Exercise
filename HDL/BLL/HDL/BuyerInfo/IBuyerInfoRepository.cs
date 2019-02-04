using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.BuyerInfo
{
    public interface IBuyerInfoRepository
    {
        string SaveBuyerInfo(Buyer objBuyer);
        GridEntity<Buyer> GetBuyerInfoSummary(GridOptions options);
        List<Buyer> GetAllBuyer();
        Buyer GenerateMaxBuyerCode();
    }
}

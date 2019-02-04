using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.BuyerInfo
{
    public class BuyerInfoService:IBuyerInfoRepository
    {
        readonly BuyerInfoDataService _buyerInfoDataService =new BuyerInfoDataService();
        public string SaveBuyerInfo(Buyer objBuyer)
        {
            return _buyerInfoDataService.SaveBuyerInfo(objBuyer);
        }

        public GridEntity<Buyer> GetBuyerInfoSummary(GridOptions options)
        {
            return _buyerInfoDataService.GetBuyerInfoSummary(options);
        }

        public List<Buyer> GetAllBuyer()
        {
            return _buyerInfoDataService.GetAllBuyer();
        }

        public Buyer GenerateMaxBuyerCode()
        {
            return _buyerInfoDataService.GenerateMaxBuyerCode();
        }
    }
}

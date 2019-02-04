using DAL.HDL.DataService;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.WarpLapper
{
    public class WarpLapperRepository : IWarpLapperRepository
    {
        private readonly static WarpLapperDataService warpLapperDataService = new WarpLapperDataService();
        public List<WarpingProdInfo> GetWarpingBySetNo(string setNo)
        {
            return warpLapperDataService.GetWarpingBySetNo(setNo);
        }

        public List<WarpingProdDetails> GetWarpingDetailByIdNo(string idNo)
        {
            return warpLapperDataService.GetWarpingDetailByIdNo(idNo);
        }
        public WarpingProdDetails SaveWarpDetail(WarpingProdDetails prodDetails)
        {
            return warpLapperDataService.SaveWarpDetail(prodDetails);
        }
        
    }
}

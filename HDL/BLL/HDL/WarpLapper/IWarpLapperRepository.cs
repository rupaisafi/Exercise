using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.WarpLapper
{
    public interface IWarpLapperRepository
    {
        List<WarpingProdInfo> GetWarpingBySetNo(string setNo); 
        List<WarpingProdDetails> GetWarpingDetailByIdNo(string idNo);
        WarpingProdDetails SaveWarpDetail(WarpingProdDetails prodDetails);
    }
}

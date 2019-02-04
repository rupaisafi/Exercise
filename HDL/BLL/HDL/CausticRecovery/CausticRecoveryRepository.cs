using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
namespace BLL.HDL.CausticRecovery
{
    public class CausticRecoveryRepository : ICausticRecoveryRepository
    {
        CausticRecoveryDataService _service = new CausticRecoveryDataService();
        public string SaveMasterInfo(Entities.HDL.CausticRecovery objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }

    }
}

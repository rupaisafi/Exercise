using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HRM;

namespace DAL.HRM
{
    public class PositionDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_Position> GetPositions()
        {
            return _common.Select_Data_List<Common_Position>("sp_Select_Position", "Get_Position_For_Combo");
        }
    }
}

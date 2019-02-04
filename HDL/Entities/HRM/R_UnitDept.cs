using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class R_UnitDept
    {
        public int UDepID { get; set; }
        public int UnitId { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string UnitName { get; set; }
    }
}

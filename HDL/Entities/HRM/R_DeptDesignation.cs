using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class R_DeptDesignation
    {
        public int DepDesignationID { get; set; }
        public int UDepID { get; set; }
        public int DesignationID { get; set; }
        public string DesignationName { get; set; }
    }
}

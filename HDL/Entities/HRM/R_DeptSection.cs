using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class R_DeptSection
    {
        public int DSecID { get; set; }
        public int UDepID { get; set; }
        public int SectionID { get; set; }
        public string SectionName { get; set; }
        public string UnitName { get; set; }
        public string DepartmentName { get; set; }
    }
}

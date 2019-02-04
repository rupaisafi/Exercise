using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class Common_Section
    {
        public int SectionID { get; set; }
        public string SectionName { get; set; }
        public string SectionNameBan { get; set; }
        public bool IsActive { get; set; }
    }
}

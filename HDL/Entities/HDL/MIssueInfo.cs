using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class MIssueInfo
    {
        public int IID { get; set; }
        public DateTime IssueDate { get; set; }
        public string SRNo { get; set; }
        public int DepartmentId { get; set; }
        public int CompanyId { get; set; }
        public int UnitCode { get; set; }
        public string TypeFlag { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        public string SaveStatus { get; set; }
        //------------------------------------------
        public string CName { get; set; }
        public string DName { get; set; }
        public string UnitName { get; set; }
    }
}

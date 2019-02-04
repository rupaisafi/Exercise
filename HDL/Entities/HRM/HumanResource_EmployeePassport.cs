using System;

namespace Entities.HRM
{
    public class HumanResource_EmployeePassport{
       
        public string PassportNo { get; set; }

        public DateTime? PIssueDate { get; set; }

        public DateTime? PExpireDate { get; set; }

        public int PAuthorityCountryID { get; set; }
    }
}
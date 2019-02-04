using System;

namespace Entities.HRM
{
    public class HumanResource_EmployeeDrivingLicense
    {
        public string DrivingLicense { get; set; }

        public DateTime? DIssueDate { get; set; }

        public DateTime? DExpireDate { get; set; }

        public int DAuthorityCountryID { get; set; }
    }
}
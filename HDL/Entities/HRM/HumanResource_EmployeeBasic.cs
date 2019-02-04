using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class HumanResource_EmployeeBasic
    {
        public long EmpID { get; set; }
        public string EmpCode { get; set; }

        public string PunchNo { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }

        public string NameEng { get; set; }
        public string TitleBan { get; set; }
        public string NameBan { get; set; }
        public string NameBan1 { get; set; }
        public DateTime? JoiningDate { get; set; }
        public int? DesignationID { get; set; }
        public string DesignationName { get; set; }
        public int? PositionID { get; set; }
        public string PositionName { get; set; }
        public int? UnitID { get; set; }
        public int? DepartmentID { get; set; }
        public int? SectionID { get; set; }
        public int? WingID { get; set; }
        public int? TeamID { get; set; }
        public int? EmpStatusID { get; set; }
        public int? EmpTypeID { get; set; }
        public int? EmpCategoryID { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string FathersName { get; set; }
        public string MothersName { get; set; }
        public string SpouseName { get; set; }
        public int? GenderID { get; set; }
        public int? ReligionID { get; set; }
        public int? MaritalStatusID { get; set; }
        public int? BloodGroupID { get; set; }
        public string NIDNo { get; set; }
        public string BirthCertificateNo { get; set; }
        public int? CountryID { get; set; }
        public byte[] Photo { get; set; }
        public string Image64 { get { return Photo != null ? Convert.ToBase64String(Photo) : null; } }
        public string UserID { get; set; }
        public string TermninalID { get; set; }
        public string SaveMessage { get; set; }


    }
}

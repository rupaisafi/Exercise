using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class EmployeeAllInformation
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

        public string UnitName { get; set; }
        public int? DepartmentID { get; set; }

        public string DepartmentName { get; set; }
        public int? SectionID { get; set; }

        public string SectionName { get; set; }
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

        public string SaveMessage { get; set; }

        //Employee Contact 
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string EmailOffice { get; set; }
        public string EmergContact { get; set; }
        public string EmergContactName { get; set; }
        public string RelationWith { get; set; }
        public string Fax { get; set; }
        public string SocialMediaID { get; set; }
        public string PreVillage { get; set; }
        public string PerVillage { get; set; }
        public string PreRoad { get; set; }
        public string PerRoad { get; set; }
        public int PreDivisionID { get; set; }
        public int PerDivisionID { get; set; }
        public int PreThanaID { get; set; }
        public int PerThanaID { get; set; }
        public int PreDistrictID { get; set; }
        public int PerDistrictID { get; set; }
        public string PrePostOffice { get; set; }
        public string PerPostOffice { get; set; }
        public string PrePostCode { get; set; }
        public string PerPostCode { get; set; }
        public string PreVillageBan { get; set; }
        public string PerVillageBan { get; set; }
        public string PreRoadBan { get; set; }
        public string PerRoadBan { get; set; }
        public string PrePostOfficeBan { get; set; }
        public string PerPostOfficeBan { get; set; }

        public string BusStop { get; set; }

        public string PassportNo { get; set; }

        public DateTime? PIssueDate { get; set; }

        public DateTime? PExpireDate { get; set; }

        public int PAuthorityCountryID { get; set; }

        public string DrivingLicense { get; set; }

        public DateTime? DIssueDate { get; set; }

        public DateTime? DExpireDate { get; set; }

        public int DAuthorityCountryID { get; set; }
    }
}

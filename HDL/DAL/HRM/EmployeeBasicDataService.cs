using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using DBManager;
using Entities.HRM;

namespace DAL.HRM
{
    public class EmployeeBasicDataService
    {
        SqlDataAdapter _da;
        SqlConnection _dbConn;
        SqlCommand _cmd;
        //DataSet _dataSet;
        DataTable _dt;
        private readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionStringHRM"].ConnectionString;
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public GridEntity<EmployeeAllInformation> GetEmployeeInfoSummary(GridOptions options)
        {
            GridEntity<EmployeeAllInformation> empList = DBManager.StoreProcedureHRM.KendoGrid<EmployeeAllInformation>.GetGridData_5(options, "sp_select_employee_grid", "get_employee_summary", "EmpCode");
            return empList;
        }
        public HumanResource_EmployeeBasic Save(HumanResource_EmployeeBasic objEmployeeBasic, DataSet dsEducation,
            HumanResource_EmployeeContact objContact, HumanResource_EmployeePassport objPassport,
            HumanResource_EmployeeDrivingLicense objDrivingLicense)
        {
            HumanResource_EmployeeBasic _employeeBasic = new HumanResource_EmployeeBasic();
            DataTable _table;
            try
            {
                _table = Insert_Update_Employee_Info("sp_InserUpdateEmployeeBasic", "SaveEmployeeInfo", objEmployeeBasic, objContact, objPassport, objDrivingLicense, dsEducation);
                _employeeBasic.EmpID = Int32.Parse(_table.Rows[0]["EmpID"].ToString());
                _employeeBasic.EmpCode = _table.Rows[0]["EmpCode"].ToString();
                _employeeBasic.PunchNo = _table.Rows[0]["PunchNo"].ToString();
                _employeeBasic.SaveMessage = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                _employeeBasic.SaveMessage = ex.Message;
            }
            return _employeeBasic;
        }
        private DataTable Insert_Update_Employee_Info(string procedure, string callname,
            HumanResource_EmployeeBasic objEmployeeBasic, HumanResource_EmployeeContact objContact, HumanResource_EmployeePassport objPassport,
            HumanResource_EmployeeDrivingLicense objDrivingLicense,
            DataSet rqdXmlv1 = null)
        {
            _dbConn = new SqlConnection(_connectionString);
            _dbConn.Open();
            _cmd = new SqlCommand(procedure, _dbConn)
            {
                CommandType = CommandType.StoredProcedure
            };
            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));

            _cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());//education Info

            _cmd.Parameters.Add(new SqlParameter("@EmpID", objEmployeeBasic.EmpID));
            _cmd.Parameters.Add(new SqlParameter("@EmpCode", objEmployeeBasic.EmpCode));
            _cmd.Parameters.Add(new SqlParameter("@PunchNo", objEmployeeBasic.PunchNo));
            _cmd.Parameters.Add(new SqlParameter("@Title", objEmployeeBasic.Title));
            _cmd.Parameters.Add(new SqlParameter("@Name", objEmployeeBasic.Name));
            _cmd.Parameters.Add(new SqlParameter("@TitleBan", objEmployeeBasic.TitleBan));
            _cmd.Parameters.Add(new SqlParameter("@NameBan", objEmployeeBasic.NameBan));
            _cmd.Parameters.Add(new SqlParameter("@JoiningDate", objEmployeeBasic.JoiningDate));
            _cmd.Parameters.Add(new SqlParameter("@DesignationID", objEmployeeBasic.DesignationID == 0 ? null : objEmployeeBasic.DesignationID));
            _cmd.Parameters.Add(new SqlParameter("@PositionID", objEmployeeBasic.PositionID == 0 ? null : objEmployeeBasic.PositionID));
            _cmd.Parameters.Add(new SqlParameter("@UnitID", objEmployeeBasic.UnitID == 0 ? null : objEmployeeBasic.UnitID));
            _cmd.Parameters.Add(new SqlParameter("@DepartmentID", objEmployeeBasic.DepartmentID == 0 ? null : objEmployeeBasic.DepartmentID));
            _cmd.Parameters.Add(new SqlParameter("@SectionID", objEmployeeBasic.SectionID == 0 ? null : objEmployeeBasic.SectionID));
            _cmd.Parameters.Add(new SqlParameter("@WingID", objEmployeeBasic.WingID == 0 ? null : objEmployeeBasic.WingID));
            _cmd.Parameters.Add(new SqlParameter("@TeamID", objEmployeeBasic.TeamID == 0 ? null : objEmployeeBasic.TeamID));
            _cmd.Parameters.Add(new SqlParameter("@EmpStatusID", objEmployeeBasic.EmpStatusID == 0 ? null : objEmployeeBasic.EmpStatusID));
            _cmd.Parameters.Add(new SqlParameter("@EmpTypeID", objEmployeeBasic.EmpTypeID == 0 ? null : objEmployeeBasic.EmpTypeID));
            _cmd.Parameters.Add(new SqlParameter("@EmpCategoryID", objEmployeeBasic.EmpCategoryID == 0 ? null : objEmployeeBasic.EmpCategoryID));

            _cmd.Parameters.Add(new SqlParameter("@DateOfBirth", objEmployeeBasic.DateOfBirth));
            _cmd.Parameters.Add(new SqlParameter("@FathersName", objEmployeeBasic.FathersName));
            _cmd.Parameters.Add(new SqlParameter("@MothersName", objEmployeeBasic.MothersName));
            _cmd.Parameters.Add(new SqlParameter("@SpouseName", objEmployeeBasic.SpouseName));
            _cmd.Parameters.Add(new SqlParameter("@GenderID", objEmployeeBasic.GenderID == 0 ? null : objEmployeeBasic.GenderID));
            _cmd.Parameters.Add(new SqlParameter("@ReligionID", objEmployeeBasic.ReligionID == 0 ? null : objEmployeeBasic.ReligionID));
            _cmd.Parameters.Add(new SqlParameter("@MaritalStatusID", objEmployeeBasic.MaritalStatusID == 0 ? null : objEmployeeBasic.MaritalStatusID));
            _cmd.Parameters.Add(new SqlParameter("@BloodGroupID", objEmployeeBasic.BloodGroupID == 0 ? null : objEmployeeBasic.BloodGroupID));
            _cmd.Parameters.Add(new SqlParameter("@NIDNo", objEmployeeBasic.NIDNo));
            _cmd.Parameters.Add(new SqlParameter("@BirthCertificateNo", objEmployeeBasic.BirthCertificateNo));
            _cmd.Parameters.Add(new SqlParameter("@CountryID", objEmployeeBasic.CountryID == 0 ? null : objEmployeeBasic.CountryID));

            _cmd.Parameters.Add(new SqlParameter("@Photo", objEmployeeBasic.Photo));

            _cmd.Parameters.Add(new SqlParameter("@Mobile", objContact.Mobile));
            _cmd.Parameters.Add(new SqlParameter("@Phone", objContact.Phone));
            _cmd.Parameters.Add(new SqlParameter("@Email", objContact.Email));
            _cmd.Parameters.Add(new SqlParameter("@EmailOffice", objContact.EmailOffice));
            _cmd.Parameters.Add(new SqlParameter("@EmergContact", objContact.EmergContact));
            _cmd.Parameters.Add(new SqlParameter("@EmergContactName", objContact.EmergContactName));
            _cmd.Parameters.Add(new SqlParameter("@RelationWith", objContact.RelationWith));
            _cmd.Parameters.Add(new SqlParameter("@Fax", objContact.Fax));
            _cmd.Parameters.Add(new SqlParameter("@SocialMediaID", objContact.SocialMediaID));
            _cmd.Parameters.Add(new SqlParameter("@PreVillage", objContact.PreVillage));
            _cmd.Parameters.Add(new SqlParameter("@PerVillage", objContact.PerVillage));
            _cmd.Parameters.Add(new SqlParameter("@PreRoad", objContact.PreRoad));
            _cmd.Parameters.Add(new SqlParameter("@PerRoad", objContact.PerRoad));
            _cmd.Parameters.Add(new SqlParameter("@PreDivisionID", objContact.PreDivisionID == 0 ? null : objContact.PreDivisionID));
            _cmd.Parameters.Add(new SqlParameter("@PerDivisionID", objContact.PerDivisionID == 0 ? null : objContact.PerDivisionID));
            _cmd.Parameters.Add(new SqlParameter("@PreThanaID", objContact.PreThanaID == 0 ? null : objContact.PreThanaID));
            _cmd.Parameters.Add(new SqlParameter("@PerThanaID", objContact.PerThanaID == 0 ? null : objContact.PerThanaID));
            _cmd.Parameters.Add(new SqlParameter("@PreDistrictID", objContact.PreDistrictID == 0 ? null : objContact.PreDistrictID));
            _cmd.Parameters.Add(new SqlParameter("@PerDistrictID", objContact.PerDistrictID == 0 ? null : objContact.PerDistrictID));
            _cmd.Parameters.Add(new SqlParameter("@PrePostOffice", objContact.PrePostOffice));
            _cmd.Parameters.Add(new SqlParameter("@PerPostOffice", objContact.PerPostOffice));
            _cmd.Parameters.Add(new SqlParameter("@PrePostCode", objContact.PrePostCode));
            _cmd.Parameters.Add(new SqlParameter("@PerPostCode", objContact.PerPostCode));
            _cmd.Parameters.Add(new SqlParameter("@PreVillageBan", objContact.PreVillageBan));
            _cmd.Parameters.Add(new SqlParameter("@PerVillageBan", objContact.PerVillageBan));
            _cmd.Parameters.Add(new SqlParameter("@PreRoadBan", objContact.PreRoadBan));
            _cmd.Parameters.Add(new SqlParameter("@PerRoadBan", objContact.PerRoadBan));
            _cmd.Parameters.Add(new SqlParameter("@PrePostOfficeBan", objContact.PrePostOfficeBan));
            _cmd.Parameters.Add(new SqlParameter("@PerPostOfficeBan", objContact.PerPostOfficeBan));
            _cmd.Parameters.Add(new SqlParameter("@BusStop", objContact.BusStop));

            _cmd.Parameters.Add(new SqlParameter("@PassportNo", objPassport.PassportNo));
            _cmd.Parameters.Add(new SqlParameter("@PIssueDate", objPassport.PIssueDate));
            _cmd.Parameters.Add(new SqlParameter("@PExpireDate", objPassport.PExpireDate));
            _cmd.Parameters.Add(new SqlParameter("@PAuthorityCountryID", objPassport.PAuthorityCountryID));

            _cmd.Parameters.Add(new SqlParameter("@DrivingLicense", objDrivingLicense.DrivingLicense));
            _cmd.Parameters.Add(new SqlParameter("@DIssueDate", objDrivingLicense.DIssueDate));
            _cmd.Parameters.Add(new SqlParameter("@DExpireDate", objDrivingLicense.DExpireDate));
            _cmd.Parameters.Add(new SqlParameter("@DAuthorityCountryID", objDrivingLicense.DAuthorityCountryID));

            _da = new SqlDataAdapter(_cmd);
            _dt = new DataTable();
            _da.Fill(_dt);
            _dbConn.Close();
            return _dt;
        }

        public DataTable GetEmployeeTreeResult(string callname, string param1 = "", string param2 = "", string param3 = "", string param4 = "")
        {
            return _common.select_data_dt_10("", "sp_Select_Employee", callname, param1, param2, param3, param4);
        }

        public GridEntity<EmployeeAllInformation> GetEmployeeSummary(GridOptions options, string condition)
        {
            string sql = "";
            sql = string.Format(@" SELECT B.EmpCode,B.EmpID,
		    NameEng=CASE WHEN (CASE WHEN LEN(ISNULL(B.TitleBan,0))>0 THEN B.NameBan ELSE B.TitleBan+' '+B.NameBan END) IS NULL THEN (CASE WHEN LEN(ISNULL(B.Title,0))>0 THEN B.Name ELSE LTRIM(B.Title)+' '+B.Name END)	ELSE (CASE WHEN LEN(ISNULL(B.Title,0))>0 THEN B.Name ELSE LTRIM(B.Title)+' '+B.Name END)+' | '+(CASE WHEN LEN(ISNULL(B.TitleBan,0))>0 THEN B.NameBan ELSE B.TitleBan+' '+B.NameBan END) END,
		    DesignationName=CASE WHEN DE.DesignationNameBan IS NULL THEN DE.DesignationName ELSE DE.DesignationName+' | '+DE.DesignationNameBan END
	        FROM [HumanResource.EmployeeBasic] B 
	        LEFT JOIN [Common.Designation] DE ON B.DesignationID=DE.DesignationID
            INNER JOIN [Common.Unit] U ON B.UnitID=U.UnitID" + condition);
            return Kendo<EmployeeAllInformation>.Grid.DataSource2(null, sql, "NameEng");
        }
    }
}
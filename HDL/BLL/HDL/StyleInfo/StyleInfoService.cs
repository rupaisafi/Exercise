using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System.Collections.Generic;
using Entities.HDL.DTO;

namespace BLL.HDL.StyleInfo
{
    public class StyleInfoService : IStyleInfoRepository
    {
        readonly StyleInfoDataService _styleInfoDataService = new StyleInfoDataService();
        public Style SaveStyleInfo(Style objStyle, StyleParamFinish objFinParam, StyleParamGrey objGreyParam, StyleParamFabric objFabParam)
        {
            var res=new Style();
            if (!CheckIsExist(objStyle.StyleCode,objStyle.StyleNo))
            {
                res = _styleInfoDataService.SaveStyleInfo(objStyle, objFinParam, objGreyParam, objFabParam);
            }
            else
            {
                res.SaveStatus = Operation.Exists.ToString();
            }
            return res;
        }

        private bool CheckIsExist(int styleCode,string styleNo)
        {
            return _styleInfoDataService.CheckIsExist(styleCode, styleNo);
        }

        public GridEntity<StyleInformation> GetStyleInfoSummary(GridOptions options, string dateFrom, string dateTo, string styleNo)
        {
            return _styleInfoDataService.GetStyleInfoSummary(options, dateFrom, dateTo, styleNo);
        }

        public List<Style> GetAllStyle()
        {
            return _styleInfoDataService.GetAllStyle();
        }

        public Style GenerateMaxStyleCode()
        {
            return _styleInfoDataService.GenerateMaxStyleCode();
        }
    }
}

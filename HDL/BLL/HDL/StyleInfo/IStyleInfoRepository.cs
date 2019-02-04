using DBManager;
using Entities.HDL;
using System.Collections.Generic;
using Entities.HDL.DTO;

namespace BLL.HDL.StyleInfo
{
    public interface IStyleInfoRepository
    {
        Style SaveStyleInfo(Style objStyle, StyleParamFinish objFinParam, StyleParamGrey objGreyParam, StyleParamFabric objFabParam);
        GridEntity<StyleInformation> GetStyleInfoSummary(GridOptions options, string dateFrom, string dateTo, string styleNo);
        List<Style> GetAllStyle();
        Style GenerateMaxStyleCode();
    }
}

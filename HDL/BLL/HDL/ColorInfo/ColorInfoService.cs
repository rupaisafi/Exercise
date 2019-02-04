using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.ColorInfo
{
    public class ColorInfoService:IColorInfoRepository
    {
        ColorInfoDataService _colorInfoDataService = new ColorInfoDataService();
        public List<Color> GetAllColor()
        {
            return _colorInfoDataService.GetAllColor();
        }

        public string SaveColorInfo(Color objColor)
        {
            return _colorInfoDataService.SaveColorInfo(objColor);
        }

        public GridEntity<Color> GetColorInfoSummary(GridOptions options)
        {
            return _colorInfoDataService.GetColorInfoSummary(options);
        }
    }
}

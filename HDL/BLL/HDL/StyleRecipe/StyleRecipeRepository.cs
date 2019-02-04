using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.StyleRecipe
{
    public class StyleRecipeRepository : IStyleRecipeRepository
    {
        StyleRecipeDataService _service = new StyleRecipeDataService();
        public List<Entities.HDL.Style> GetAllStyle()
        {
            return _service.GetAllStyle();
        }
        public List<Entities.HDL.SetInfoEntity> GetAllSetNo()
        {
            return _service.GetAllSetNo();
        }
        public List<Entities.HDL.Color> GetAllColor()
        {
            return _service.GetAllColor();
        }
        public List<Entities.HDL.StyleParameterFinishing> GetStyleParameter(int SID)
        {
            return _service.GetStyleParameter(SID);
        }
        
        public List<Entities.HDL.ICode> GetICode()
        {
            return _service.GetICode();
        }
        public List<Entities.HDL.StyleDetailsFinishingRecepi> GetStyleRecipe(int SID)
        {
            return _service.GetStyleRecipe(SID);
        }
        
        public string SaveInfo(StyleParameterFinishing objRec)
        {
            return _service.SaveInfo(objRec); 
        }
        
        public string SaveDetailInfo(StyleDetailsFinishingRecepi objRec)
        {
            return _service.SaveDetailInfo(objRec);
        }
    }
}

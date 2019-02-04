using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.StyleRecipe
{
    public interface IStyleRecipeRepository
    {
        
           List<Entities.HDL.Style> GetAllStyle();
           List<Entities.HDL.SetInfoEntity> GetAllSetNo();
           List<Entities.HDL.Color> GetAllColor(); 
           List<Entities.HDL.StyleParameterFinishing> GetStyleParameter(int SID);
           List<Entities.HDL.ICode> GetICode(); 
           List<Entities.HDL.StyleDetailsFinishingRecepi> GetStyleRecipe(int SID);
           string SaveInfo(StyleParameterFinishing objRec);
           string SaveDetailInfo(StyleDetailsFinishingRecepi objRec);
    }
}

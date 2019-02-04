using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.DyeingUtility
{
    public interface IDyeingUtilityRepository
    {
        List<SetInfoEntity> GetAllDyeingSet();
        List<DyeingProcess> GetDyeingProcessInfo(string setNo);
        List<DyeingUtilityRunAndStop> GetAllRunAndStop(string setNo);
        List<DyeingUtilityTimeUtilization> GetAllTimeUtilization(string setNo);
        List<DyeingUtilityWastageDetail> GetAllWastageDetail(string setNo);
        List<DyeingUtilityDrainageDetail> GetAllDrainageDetail(string setNo);
        List<DyeingProcessCreelUnit> GetAllCreelUnit(string setNo);
        List<DyeingProcessDyeingParameter> GetAllDyeingParameter(string setNo);
        List<DyeingProcessSizingParameter> GetAllSizingParameter(string setNo);
        List<DyeingProcessHeadStock> GetAllHeadStock(string setNo);
        List<DyeingProcessCompensator> GetAllCompensator(string setNo);
        List<DyeingProcessCreelLoading> GetAllCreelLoading(string setNo);
        List<DyeingProcessRecipe> GetAllRecipe(string setNo);


        DyeingProcess SaveDyeingProcessInfo(DyeingProcess dyeingProcess);
        DyeingUtilityRunAndStop SaveRunAndStop(DyeingUtilityRunAndStop runAndStop);
        DyeingUtilityTimeUtilization SaveTimeUtilization(DyeingUtilityTimeUtilization timeUtilization);
        DyeingUtilityWastageDetail SaveWastageDetail(DyeingUtilityWastageDetail wastageDetail);
        DyeingUtilityDrainageDetail SaveDrainageDetail(DyeingUtilityDrainageDetail drainageDetail);
        DyeingProcessCreelUnit SaveCreelUnit(DyeingProcessCreelUnit creelUnit);
        DyeingProcessDyeingParameter SaveDyeingParameter(DyeingProcessDyeingParameter dyeingParameter);
        DyeingProcessSizingParameter SaveSizingParameter(DyeingProcessSizingParameter sizingParameter);
        DyeingProcessHeadStock SaveHeadStock(DyeingProcessHeadStock headStock);
        DyeingProcessCompensator SaveCompensator(DyeingProcessCompensator compensator);
        DyeingProcessCreelLoading SaveCreelLoading(DyeingProcessCreelLoading creelLoading);
        DyeingProcessRecipe SaveRecipe(DyeingProcessRecipe recipe);
    }
}

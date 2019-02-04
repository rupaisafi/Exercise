using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.DyeingUtility
{
    public class DyeingUtilityRepository : IDyeingUtilityRepository
    {
        private readonly static DyeingUtilityDataService dataService = new DyeingUtilityDataService();

        public List<SetInfoEntity> GetAllDyeingSet()
        {
            return dataService.GetAllDyeingSet();
        }
        public List<DyeingProcess> GetDyeingProcessInfo(string setNo)
        {
            return dataService.GetDyeingProcessInfo(setNo);
        }
        public List<DyeingUtilityRunAndStop> GetAllRunAndStop(string setNo) {
            return dataService.GetAllRunAndStop(setNo);
        }
        public List<DyeingUtilityTimeUtilization> GetAllTimeUtilization(string setNo) {
           return dataService.GetAllTimeUtilization(setNo);
        }
        public List<DyeingUtilityWastageDetail> GetAllWastageDetail(string setNo)
        {
            return dataService.GetAllWastageDetail(setNo);
        }
        public List<DyeingUtilityDrainageDetail> GetAllDrainageDetail(string setNo)
        {
            return dataService.GetAllDrainageDetail(setNo);
        }
        public List<DyeingProcessCreelUnit> GetAllCreelUnit(string setNo)
        {
            return dataService.GetAllCreelUnit(setNo);
        }
        public List<DyeingProcessDyeingParameter> GetAllDyeingParameter(string setNo)
        {
            return dataService.GetAllDyeingParameter(setNo);
        }
        public List<DyeingProcessSizingParameter> GetAllSizingParameter(string setNo)
        {
            return dataService.GetAllSizingParameter(setNo);
        }
        public List<DyeingProcessHeadStock> GetAllHeadStock(string setNo)
        {
            return dataService.GetAllHeadStock(setNo);
        }
        public List<DyeingProcessCompensator> GetAllCompensator(string setNo)
        {
            return dataService.GetAllCompensator(setNo);
        }
        public List<DyeingProcessCreelLoading> GetAllCreelLoading(string setNo)
        {
            return dataService.GetAllCreelLoading(setNo);
        }
        public List<DyeingProcessRecipe> GetAllRecipe(string setNo)
        {
            return dataService.GetAllRecipe(setNo);
        }

        public DyeingProcess SaveDyeingProcessInfo(DyeingProcess dyeingProcess)
        {
            return dataService.SaveDyeingProcessInfo(dyeingProcess);
        }
        public DyeingUtilityRunAndStop SaveRunAndStop(DyeingUtilityRunAndStop runAndStop)
        {
            return dataService.SaveRunAndStop(runAndStop);
        }
        public DyeingUtilityTimeUtilization SaveTimeUtilization(DyeingUtilityTimeUtilization timeUtilization) {
            return dataService.SaveTimeUtilization(timeUtilization);
        }
        public DyeingUtilityWastageDetail SaveWastageDetail(DyeingUtilityWastageDetail wastageDetail) {
            return dataService.SaveWastageDetail(wastageDetail);
        }
        public DyeingUtilityDrainageDetail SaveDrainageDetail(DyeingUtilityDrainageDetail drainageDetail) {
            return dataService.SaveDrainageDetail(drainageDetail);
        }
        public DyeingProcessCreelUnit SaveCreelUnit(DyeingProcessCreelUnit creelUnit)
        {
            return dataService.SaveCreelUnit(creelUnit);
        }
        public DyeingProcessDyeingParameter SaveDyeingParameter(DyeingProcessDyeingParameter dyeingParameter)
        {
            return dataService.SaveDyeingParameter(dyeingParameter);
        }
        public DyeingProcessSizingParameter SaveSizingParameter(DyeingProcessSizingParameter sizingParameter)
        {
            return dataService.SaveSizingParameter(sizingParameter);
        }
        public DyeingProcessHeadStock SaveHeadStock(DyeingProcessHeadStock headStock)
        {
            return dataService.SaveHeadStock(headStock);
        }
        public DyeingProcessCompensator SaveCompensator(DyeingProcessCompensator compensator)
        {
            return dataService.SaveCompensator(compensator);
        }
        public DyeingProcessCreelLoading SaveCreelLoading(DyeingProcessCreelLoading creelLoading)
        {
            return dataService.SaveCreelLoading(creelLoading);
        }
        public DyeingProcessRecipe SaveRecipe(DyeingProcessRecipe recipe)
        {
            return dataService.SaveRecipe(recipe);
        }
    }
}

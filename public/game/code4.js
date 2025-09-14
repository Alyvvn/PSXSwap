gdjs.GameOverSceneCode = {};
gdjs.GameOverSceneCode.localVariables = [];
gdjs.GameOverSceneCode.GDGameOverSceneObjects1= [];
gdjs.GameOverSceneCode.GDGameOverSceneObjects2= [];
gdjs.GameOverSceneCode.GDGameOverSceneObjects3= [];
gdjs.GameOverSceneCode.GDTryAgainTextObjects1= [];
gdjs.GameOverSceneCode.GDTryAgainTextObjects2= [];
gdjs.GameOverSceneCode.GDTryAgainTextObjects3= [];


gdjs.GameOverSceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.sound.isMusicOnChannelPlaying(runtimeScene, 1));
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(29003684);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "Sound Effects\\Background Music.wav", 1, true, 100, 1);
}}

}


};gdjs.GameOverSceneCode.asyncCallback29006732 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverSceneCode.localVariables);
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "TitleScene", false);
}gdjs.GameOverSceneCode.localVariables.length = 0;
}
gdjs.GameOverSceneCode.eventsList1 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverSceneCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.GameOverSceneCode.asyncCallback29006732(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverSceneCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("TryAgainText"), gdjs.GameOverSceneCode.GDTryAgainTextObjects2);
{for(var i = 0, len = gdjs.GameOverSceneCode.GDTryAgainTextObjects2.length ;i < len;++i) {
    gdjs.GameOverSceneCode.GDTryAgainTextObjects2[i].getBehavior("Flash").Flash(0, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(29005492);
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "Delay");
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "Delay") >= 0.5;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = !runtimeScene.getScene().getVariables().getFromIndex(0).getAsBoolean();
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(29006620);
}
}
}
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).setBoolean(true);
}{gdjs.evtTools.sound.playSound(runtimeScene, "Sound Effects\\Gunshot.mp3", false, 100, 1);
}
{ //Subevents
gdjs.GameOverSceneCode.eventsList1(runtimeScene);} //End of subevents
}

}


};gdjs.GameOverSceneCode.eventsList3 = function(runtimeScene) {

{


gdjs.GameOverSceneCode.eventsList0(runtimeScene);
}


{


gdjs.GameOverSceneCode.eventsList2(runtimeScene);
}


};

gdjs.GameOverSceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameOverSceneCode.GDGameOverSceneObjects1.length = 0;
gdjs.GameOverSceneCode.GDGameOverSceneObjects2.length = 0;
gdjs.GameOverSceneCode.GDGameOverSceneObjects3.length = 0;
gdjs.GameOverSceneCode.GDTryAgainTextObjects1.length = 0;
gdjs.GameOverSceneCode.GDTryAgainTextObjects2.length = 0;
gdjs.GameOverSceneCode.GDTryAgainTextObjects3.length = 0;

gdjs.GameOverSceneCode.eventsList3(runtimeScene);
gdjs.GameOverSceneCode.GDGameOverSceneObjects1.length = 0;
gdjs.GameOverSceneCode.GDGameOverSceneObjects2.length = 0;
gdjs.GameOverSceneCode.GDGameOverSceneObjects3.length = 0;
gdjs.GameOverSceneCode.GDTryAgainTextObjects1.length = 0;
gdjs.GameOverSceneCode.GDTryAgainTextObjects2.length = 0;
gdjs.GameOverSceneCode.GDTryAgainTextObjects3.length = 0;


return;

}

gdjs['GameOverSceneCode'] = gdjs.GameOverSceneCode;

gdjs.StartSceneCode = {};
gdjs.StartSceneCode.localVariables = [];
gdjs.StartSceneCode.GDTitleScreenObjects1= [];
gdjs.StartSceneCode.GDTitleScreenObjects2= [];
gdjs.StartSceneCode.GDStartTheGameObjects1= [];
gdjs.StartSceneCode.GDStartTheGameObjects2= [];


gdjs.StartSceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26201828);
}
if (isConditionTrue_0) {
{gdjs.evtTools.advancedWindow.setFullScreenable(true, runtimeScene);
}{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}}

}


};gdjs.StartSceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.sound.isMusicOnChannelPlaying(runtimeScene, 1));
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26202932);
}
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "Sound Effects\\Background Music.wav", 1, true, 100, 1);
}}

}


};gdjs.StartSceneCode.asyncCallback26205308 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.StartSceneCode.localVariables);
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "TitleScene", false);
}gdjs.StartSceneCode.localVariables.length = 0;
}
gdjs.StartSceneCode.eventsList2 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.StartSceneCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.StartSceneCode.asyncCallback26205308(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.StartSceneCode.eventsList3 = function(runtimeScene) {

{


gdjs.StartSceneCode.eventsList0(runtimeScene);
}


{


gdjs.StartSceneCode.eventsList1(runtimeScene);
}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26203548);
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26205236);
}
}
}
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).setBoolean(true);
}
{ //Subevents
gdjs.StartSceneCode.eventsList2(runtimeScene);} //End of subevents
}

}


};

gdjs.StartSceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.StartSceneCode.GDTitleScreenObjects1.length = 0;
gdjs.StartSceneCode.GDTitleScreenObjects2.length = 0;
gdjs.StartSceneCode.GDStartTheGameObjects1.length = 0;
gdjs.StartSceneCode.GDStartTheGameObjects2.length = 0;

gdjs.StartSceneCode.eventsList3(runtimeScene);
gdjs.StartSceneCode.GDTitleScreenObjects1.length = 0;
gdjs.StartSceneCode.GDTitleScreenObjects2.length = 0;
gdjs.StartSceneCode.GDStartTheGameObjects1.length = 0;
gdjs.StartSceneCode.GDStartTheGameObjects2.length = 0;


return;

}

gdjs['StartSceneCode'] = gdjs.StartSceneCode;

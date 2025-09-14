gdjs.TitleSceneCode = {};
gdjs.TitleSceneCode.localVariables = [];
gdjs.TitleSceneCode.GDTitleScreenObjects1= [];
gdjs.TitleSceneCode.GDTitleScreenObjects2= [];
gdjs.TitleSceneCode.GDStartTheGameObjects1= [];
gdjs.TitleSceneCode.GDStartTheGameObjects2= [];


gdjs.TitleSceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26219924);
}
if (isConditionTrue_0) {
{gdjs.evtTools.advancedWindow.setFullScreenable(true, runtimeScene);
}{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}}

}


};gdjs.TitleSceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.sound.isMusicOnChannelPlaying(runtimeScene, 1));
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26221028);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "Sound Effects\\Background Music.wav", 1, true, 100, 1);
}}

}


};gdjs.TitleSceneCode.asyncCallback26223756 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.TitleSceneCode.localVariables);
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "GameScene", false);
}gdjs.TitleSceneCode.localVariables.length = 0;
}
gdjs.TitleSceneCode.eventsList2 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.TitleSceneCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.TitleSceneCode.asyncCallback26223756(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.TitleSceneCode.eventsList3 = function(runtimeScene) {

{


gdjs.TitleSceneCode.eventsList0(runtimeScene);
}


{


gdjs.TitleSceneCode.eventsList1(runtimeScene);
}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26221484);
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26223188);
}
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("StartTheGame"), gdjs.TitleSceneCode.GDStartTheGameObjects1);
{for(var i = 0, len = gdjs.TitleSceneCode.GDStartTheGameObjects1.length ;i < len;++i) {
    gdjs.TitleSceneCode.GDStartTheGameObjects1[i].getBehavior("Flash").Flash(1, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{runtimeScene.getScene().getVariables().getFromIndex(0).setBoolean(true);
}{gdjs.evtTools.sound.playSound(runtimeScene, "Sound Effects\\Gunshot.mp3", false, 100, 1);
}
{ //Subevents
gdjs.TitleSceneCode.eventsList2(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Escape");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "Delay") >= 1;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(26224876);
}
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.stopGame(runtimeScene);
}}

}


};

gdjs.TitleSceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.TitleSceneCode.GDTitleScreenObjects1.length = 0;
gdjs.TitleSceneCode.GDTitleScreenObjects2.length = 0;
gdjs.TitleSceneCode.GDStartTheGameObjects1.length = 0;
gdjs.TitleSceneCode.GDStartTheGameObjects2.length = 0;

gdjs.TitleSceneCode.eventsList3(runtimeScene);
gdjs.TitleSceneCode.GDTitleScreenObjects1.length = 0;
gdjs.TitleSceneCode.GDTitleScreenObjects2.length = 0;
gdjs.TitleSceneCode.GDStartTheGameObjects1.length = 0;
gdjs.TitleSceneCode.GDStartTheGameObjects2.length = 0;


return;

}

gdjs['TitleSceneCode'] = gdjs.TitleSceneCode;

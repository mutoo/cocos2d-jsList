# cocos2d-jsList
an utility to generate jsList in project.json automatically for cocos2d-js.

## Install

```
$ npm install jslist
```

## Usage

first, add `jsListOrder` to project.json :

```
{
  ...
  jsListOrder: [
    "src/**/*.js"
  ]
  ...
}
```

note: jsList use [node-glob](https://github.com/isaacs/node-glob) to match filename.

and then, run jsList:

```
cd /path/to/your/cocos2d-js/project
jslist project.json
```

## Advance

list the file in order:

```
jsListOrder: [
  ""
  "src/**/*.js"
  "src/resource.js",
  "src/app.js"
]
```

that would always put `src/app.js` at the end;

it's useful to sort those js file with dependencies:

```
jsListOrder: [
  "src/lib/**/*.js",
  "src/controller/SuperController.js",
  "src/controller/**/*.js",
  "src/model/**/*.js",
  "src/view/**/*.js",
  "src/**/*.js",
]
```

## Example

```
{
  "project_type": "javascript",
  "debugMode": 1,
  "showFPS": true,
  "frameRate": 60,
  "id": "gameCanvas",
  "renderMode": 0,
  "engineDir": "frameworks/cocos2d-html5",
  "modules": [
    "cocos2d",
    "cocostudio"
  ],
  "jsListOrder": [
    "src/lib/puremvc-1.0.1.js",
    "src/lib/**/*.js",
    "src/utils/**/*.js",
    "src/const.js",
    "src/lang.js",
    "src/controller/command/context/ContextCommand.js",
    "src/controller/**/*.js",
    "src/model/**/*.js",
    "src/view/mediator/context/ContextMediator.js",
    "src/view/**/*.js",
    "src/**/*.js",
    "src/resource.js",
    "src/app.js"
  ],
  "jsList": [
    "src/lib/puremvc-1.0.1.js",
    "src/lib/puremvc-statemachine.1.0.js",
    "src/lib/underscore.js",
    "src/utils/helper.js",
    "src/const.js",
    "src/lang.js",
    "src/controller/command/context/ContextCommand.js",
    "src/controller/command/CheckUserAndLoginCommand.js",
    "src/controller/command/ConnectToServerCommand.js",
    "src/controller/command/context/AddChildContextCommand.js",
    "src/controller/command/context/CloseContextCommand.js",
    "src/controller/command/context/RunSceneWithContextCommand.js",
    "src/controller/command/startup/InjectFSMCommand.js",
    "src/controller/command/startup/PrepControllerCommand.js",
    "src/controller/command/startup/PrepModelCommand.js",
    "src/controller/command/startup/PrepViewCommand.js",
    "src/controller/command/startup/StartupCommand.js",
    "src/model/proxy/context/ContextProxy.js",
    "src/model/proxy/context/GroupProxy.js",
    "src/model/proxy/ServersProxy.js",
    "src/model/proxy/UserProxy.js",
    "src/model/vo/context/Context.js",
    "src/model/vo/context/Group.js",
    "src/model/vo/Server.js",
    "src/model/vo/Token.js",
    "src/model/vo/User.js",
    "src/view/mediator/context/ContextMediator.js",
    "src/view/mediator/DirectorMediator.js",
    "src/view/mediator/LoginMediator.js",
    "src/view/mediator/MainMediator.js",
    "src/view/mediator/NotificationMediator.js",
    "src/view/mediator/ServersMediator.js",
    "src/view/ui/LoginLayer.js",
    "src/view/ui/MainLayer.js",
    "src/view/ui/NotificationLayer.js",
    "src/view/ui/ServersLayer.js",
    "src/resource.js",
    "src/app.js"
  ]
}
```
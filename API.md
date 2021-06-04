1.公共约定(api规范)
- 后端尽量不抛出异常
- 后端返回的data_status_code 0: 成功; -1: 失败. 
- data_status_code不和http_status_code混合使用,言下之意就是,前端正确的获得了后端返回的数据的条件是"http_status_code==200 && data_status_code==0"
- 后端返回的数据格式: {"code":0, "message": "XXXX", "data": object}, 其中message是对code的说明,data是返回的具体数据,只有code=0时才可能返回data数据 


2.其他参数
- bu 部门名称, 对应bu_t中的name字段
- bid 部门id, 对应bu_t中的id字段; scene_t和rules_t中的bid字段
- scene 场景名称, 对应scene_t中的name字段
- sid 场景id,对应scene_t中的id字段,对应rules_t中的sid字段
- status 规则状态, 0下线，1上线


3. api及相关参数说明

|说明| api  | method |parameters |success | failed |
| ------ | ---- | ------ | --------- | ---     | ----  | 
|获取所有部门| /bu  | GET    | 无        | {"code":0, "message":"成功", "data":[{"id":1, "name":"xxx部门"},...] } | {"code":-1, "message":"失败" } 或直接返回前端http的错误(码) |
|获取部门对应的场景  | /scenes|GET   | bid       | {"code":0, "message":"成功", "data":[{"id":1, "name":"xxx场景"},...] } |{"code":-1, "message":"失败" } 或直接返回前端http的错误(码)|
|获取指定部门和场景下的离(在)线规则| /rules| GET | bid, sid, status,其中bid是部门id,sid是场景id,status是规则启用或停用标志位, | {"code":-1, "message":"成功", "data":[{"id":1, "name":"xxx规则", "description":...},...] }| {"code":-1, "message":"失败" } 或直接返回前端http的错误(码)|
|改变成场景的执行模式| /change/em| POST | {"id":6, "bid":8},其中id是场景id, bid是部门id | {"code":0, "message":"成功", "data":true} | {"code":-1, "message":"成功", "data":true}或直接返回前端http的错误(码) |
|新增部门| /add/bu | GET |bu:部门名称|{"code":0, "message":"创建部门成功"}| {"code":-1, "message":"创建部门失败"}或直接返回前端http的错误(码)|
|为指定的部门新增| /add/scene| GET| bu:部门名称, scene:场景名称, eid:执行模式编号| {"code":0, "message":"创建场景成功"}| {"code":-1, "message":"创建场景失败"}或直接返回前端http的错误(码)|
|在指定的部门和场景下新增规则| /add/rule| POST| bu:部门名称, scene:场景名称, name:规则名称,description:规则描述,salience:规则优先级,content:规则体|{"code":0, "message":"创建规则成功"}| {"code":-1, "message":"创建规则失败"}或直接返回前端http的错误(码)| 
|更新规则(的描述、优先级或规则体)| /update/rule|POST |bid:部门id, sid:场景id, name:规则名称,description:规则描述,salience:规则优先级,content:规则体|{"code":0, "message":"更新规则成功"}| {"code":-1, "message":"更新规则失败"}或直接返回前端http的错误(码)|
|上(下)线规则| /change/status|POST | {"bid":1,"sid":2, "name":"xxx规则", "status":0}| {"code":0, "message":"规则状态更新成功"}| {"code":-1, "message":"规则状态更新失败"}或直接返回前端http的错误(码)|

4. 简单的权限控制
- 仅支持登陆, 因为在真实的内部场景,账号都是分配的，所以没有支持注册

|说明| api  | method |parameters |success | failed |
| ------ | ---- | ------ | --------- | --- | ----  | 
|登陆|/user/login |POST | {"username":"calo","password":12345}| {"code":0, "message":"登陆成功","data":{"username":"calo", "token":"xxxxxx"}}|{"code":-1, "message":"登陆失败"}|

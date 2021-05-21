import emData from "./emData";


let emKV ={}

class Helper {

    getExecuteModelName(id){
        if (emKV === {}){
            for (let i = 0; i < emData.length; i ++) {
                let em = emData[i]
                emKV[em.id] = em.name
            }
        }

        return emKV[id]
    }

    getSceneExecuteModelId(sid, sceneOption){
        for (let i = 0; i < sceneOption.length; i ++){
            let scene = sceneOption[i]
            if (scene.id === sid){
                return scene.eid
            }
        }
    }
}

const emHelper = new Helper();

export default emHelper

import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, MutationTree, ActionTree, GetterTree } from 'vuex'

// TODO削除
// eslint-disable-next-line
export interface State {
  // ここに型を定義する
  // SampleList: SampleItem[];
}

// TODO削除
// eslint-disable-next-line
export const key: InjectionKey<Store<State>> = Symbol()
const state: State = {
  // ここにデフォルトの値を用意しておく。型に沿うように空配列を入れるなど
  // sampleList: [
  // ],
}

const getters: GetterTree<State, any> = {
  // ここにはGetterを定義する
  // 例
  // size: (state: State) => {
  //   return state.SampleList.length;
  // },
}

export const enum MUTATIONS {
  // ここにはMutationの定義をおく。exportしているため、別ファイルからも利用が可能
  // ADD =  'ADD'
}
const mutations: MutationTree<State> = {
  // [MUTATIONS.ADD](state: any, newitem: SampleItem) {
  //   state.SampleList.push({ ...newitem });
  // }
}

const API_BASE = `${window.origin}/api` // TODO 環境変数
const actions: ActionTree<State, any> = {
  // fetchSampleItem: async ({dispatch}, id: number)=>{
  //   return await fetch(`${API_BASE}/item/${id}`).then((res) => res.json())
  // },

}

export default createStore({
  state,
  actions,
  mutations,
  getters,
  modules: {
    // 別ファイルがある場合こちらに
  },
})

// our own `useStore` composition function for types
export function useStore () {
  return baseUseStore(key)
}

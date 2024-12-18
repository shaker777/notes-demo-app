import type {SettingsState} from './type/settings'
import { defineStore } from 'pinia'
import {computed, reactive} from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const state = reactive<SettingsState>({
        showFooter: true
    }) as SettingsState

    const getShowFooter = computed((): boolean | null => state.showFooter)

    const setShowFooter = (show: boolean): void => {
        state.showFooter = show
    }

    return {
        getShowFooter,
        setShowFooter
    }
})
import type {SettingsState} from './type/settings'
import { defineStore } from 'pinia'
import {computed, reactive} from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const state = reactive<SettingsState>({
        showFooter: true
    }) as SettingsState

    const getShowFooter = computed((): boolean | null => state.showFooter)

    function toggleShowFooter(): void {
        state.showFooter = !state.showFooter
    }

    return {
        getShowFooter,
        toggleShowFooter
    }
})
import type {SettingsState} from './type/settings'
import { defineStore } from 'pinia'
import {computed, reactive} from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const state = reactive<SettingsState>({
        showFooter: localStorage.getItem('showFooter') === 'true',
        filterCompleted: false
    }) as SettingsState

    const getShowFooter = computed((): boolean | null => state.showFooter)

    function toggleShowFooter(): void {
        state.showFooter = !state.showFooter
        localStorage.setItem('showFooter', state.showFooter ? 'true' :  'false');
    }

    const getFilterCompleted = computed((): boolean | null => state.filterCompleted)

    function toggleFilterCompleted(): void {
        state.filterCompleted = !state.filterCompleted
        //console.log('state.filterCompleted: ', state.filterCompleted)
    }

    function setFilterCompleted(value:boolean): void {
        state.filterCompleted = value
        //console.log('state.filterCompleted: ', state.filterCompleted)
    }

    return {
        getShowFooter,
        toggleShowFooter,
        getFilterCompleted,
        toggleFilterCompleted,
        setFilterCompleted
    }
})
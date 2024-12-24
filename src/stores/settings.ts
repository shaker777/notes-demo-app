import type {SettingsState} from './type/settings'
import { defineStore } from 'pinia'
import {computed, reactive} from 'vue'
import ActionMode from "@/types/enum";

export const useSettingsStore = defineStore('settings', () => {
    const state = reactive<SettingsState>({
        showFooter: localStorage.getItem('showFooter') === 'true',
        showAddButton: true,
        filterCompleted: false,
        actionMode: ActionMode.None,
    }) as SettingsState

    const getShowFooter = computed((): boolean | null => state.showFooter)

    function toggleShowFooter(): void {
        state.showFooter = !state.showFooter
        localStorage.setItem('showFooter', state.showFooter ? 'true' :  'false');
    }

    const getShowAddButton = computed((): boolean | null => state.showAddButton)

    function setShowAddButton(value:boolean): void {
        state.showAddButton = value
    }

    const getFilterCompleted = computed((): boolean | null => state.filterCompleted)

    function toggleFilterCompleted(): void {
        state.filterCompleted = !state.filterCompleted
        console.log('state.filterCompleted: ', state.filterCompleted)
    }

    function setFilterCompleted(value:boolean): void {
        state.filterCompleted = value
    }

    const getActionMode = computed((): ActionMode => state.actionMode)

    function setActionMode(value:ActionMode): void {
        state.actionMode = value
    }

    return {
        getShowFooter,
        toggleShowFooter,
        getShowAddButton,
        setShowAddButton,
        getFilterCompleted,
        toggleFilterCompleted,
        setFilterCompleted,
        getActionMode,
        setActionMode
    }
})
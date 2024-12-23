import {ref, computed} from 'vue'
import {useSettingsStore} from '@/stores/settings'
import ActionMode from "@/types/enum";

export default function useSettings() {
    const store = useSettingsStore()

    const showFooter = computed(() => store.getShowFooter)

    const updateShowFooter = (): void => {
        store.toggleShowFooter()
    }

    const filterCompleted = computed(() => store.getFilterCompleted)

    const updateFilterCompleted = (): void => {
        store.toggleFilterCompleted()
    }

    const setFilterCompleted = (value:boolean): void => {
        store.setFilterCompleted(value)
    }

    const actionMode = computed(() => store.getActionMode)

    const setActionMode = (value:ActionMode): void => {
        store.setActionMode(value)
    }

    return {
        showFooter,
        updateShowFooter,
        filterCompleted,
        updateFilterCompleted,
        setFilterCompleted,
        actionMode,
        setActionMode
    }
}

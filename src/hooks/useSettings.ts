import {ref, computed} from 'vue'
import {useSettingsStore} from '@/stores/settings'

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

    return {
        showFooter,
        updateShowFooter,
        filterCompleted,
        updateFilterCompleted,
        setFilterCompleted
    }
}

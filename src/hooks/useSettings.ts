import {ref, computed} from 'vue'
import {useSettingsStore} from '@/stores/settings'

export default function useSettings() {
    const store = useSettingsStore()

    const showFooter = computed(() => store.getShowFooter)

    const updateShowFooter = (show: boolean): void => {
        store.setShowFooter(show)
    }

    return {
        showFooter,
        updateShowFooter
    }
}

import {ref, computed} from 'vue'
import {useSettingsStore} from '@/stores/settings'

export default function useSettings() {
    const store = useSettingsStore()

    const showFooter = computed(() => store.getShowFooter)

    const updateShowFooter = (): void => {
        store.toggleShowFooter()
    }

    return {
        showFooter,
        updateShowFooter
    }
}

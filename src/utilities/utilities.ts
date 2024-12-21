export default function capitalizeFirstLetter(value: string | undefined): string {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return ''
}
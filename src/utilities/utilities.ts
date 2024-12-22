export function capitalizeFirstLetter(value: string | undefined): string {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return ''
}

export function validateInputLenght(value: string | undefined): boolean | string {
    if (!value) {
        return 'Напишите что-нибудь'
    }
    if (value.length < 3) {
        return 'Заметка должна быть длинее трех букв'
    }
    if (value.length > 50) {
        return 'Заметка должна быть короче 50 букв'
    }
    return true
}
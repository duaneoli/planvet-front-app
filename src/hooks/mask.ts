export const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskDate = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1-$2")
        .replace(/(\d{2})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}

export const maskCreditCard = (value: string) => {
    return value
        .replace(/\D/g, "")
        .substring(0, 16)
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
}

export const maskCep = (value: string) => {
    return value
        .replace(/\D/g, "")
        .substring(0, 8)
        .replace(/(\d{5})(\d)/, "$1-$2")
}
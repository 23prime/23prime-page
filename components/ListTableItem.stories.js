export default {
    title: "Components",
    argTypes: {
        header: {
            control: { type: "text" },
            defaultValue: "Twitter",
        },
        data: {
            control: { type: "text" },
            defaultValue: "@23_prime",
        },
        url: {
            control: { type: "text" },
            defaultValue: "https://twitter.com/23_prime",
        },
    },
};

export const ListTableItem = (_, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<list-table-item :header="$props.header" :data="$props.data" :url=$props.url />`,
});

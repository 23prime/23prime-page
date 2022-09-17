export default {
    title: "Components",
    argTypes: {
        icon: {
            control: { type: "text" },
            defaultValue: "fa-home",
        },
        title: {
            control: { type: "text" },
            defaultValue: "Home",
        },
    },
};

export const LinkMenu = (_, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `<link-menu :icon="$props.icon" :title="$props.title" />`,
});

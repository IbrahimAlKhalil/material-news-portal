const {registerBlockType} = wp.blocks;
const blockStyle = {backgroundColor: '#900', color: '#fff', padding: '20px'};

registerBlockType('sahara/wtf', {
    title: 'Hello World (Step 1)',

    icon: 'universal-access-alt',

    category: 'layout',

    edit({className}) {
        console.log(classes);
        return <p className={className} style={blockStyle}>Hello editor.</p>;
    },

    save() {
        return <p style={blockStyle}>Hello saved content.</p>;
    },
});
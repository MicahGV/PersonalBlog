const PostPreview = createClass({
    render: function () {
        const {
            entry,
            widgetFor,
            getAsset
        } = this.props;
        return h('div', {
                id: 'container'
            },
            h('main', {},
                h('article', {},
                    h('h1', {}, entry.getIn(['data', 'title'])),
                    h('aside', {},
                        h('ul', {},
                            h('li', {},
                                h('time', {}, (entry.getIn(["data", "date"])))
                            ),
                            h('li', {},
                                h('span', {}, 'Categories: '),
                                (entry.getIn(["data", "categories"]) || []).map((category, index) => {
                                    return h('em', {},
                                        h('a', {}, `${category}`)
                                    )
                                })),
                            h('li', {}, (entry.getIn(["data", "tags"]) || []).map((tag, index) => {
                                return h('em', {},
                                    h('a', {}, `#${tag}`)
                                )
                            })),
                            h('li', {}, 'X min Read')
                        )
                    ),
                    widgetFor('body')
                )
            )
        );
    }
});

const PagePreview = createClass({
    render: function () {
        const {
            entry,
            widgetFor,
            getAsset
        } = this.props;
        return h('div', {
                id: 'container'
            },
            h('main', {},
                h('article', {},
                    h('h1', {}, entry.getIn(['data', 'title'])),
                    widgetFor('body')
                )
            )
        );
    }
});


CMS.registerPreviewStyle("https://fonts.googleapis.com/css?family=Roboto+Slab|Ruda")
CMS.registerPreviewStyle("/css/styles.css")
CMS.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewTemplate("pages", PagePreview);
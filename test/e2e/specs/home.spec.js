describe('Home page', () => {
    it('does stuff', (client) => {
        client
        .url(client.globals.devServerURL)
        .expect.element('button').text.to.equal('LOG IN');
    });
});

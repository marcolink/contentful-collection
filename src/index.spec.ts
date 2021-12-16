import getContentfulCollection from "./index";

describe("A fetch collection function", () => {

    it('calls collection function with default skip value', async () => {
        const func = jest.fn().mockResolvedValue({items: [], total: 0})
        await getContentfulCollection(func)
        expect(func).toHaveBeenCalledWith({skip: 0})
    })

    it('calls collection function with query value', async () => {
        const func = jest.fn().mockResolvedValue({items: [], total: 0})
        await getContentfulCollection(func, {hello: 'world'})
        expect(func).toHaveBeenCalledWith({skip: 0, hello: 'world'})
    })

    it('calls collection function several times to fetch full collection', async () => {
        const func = jest.fn().mockResolvedValue({items: [1, 2], total: 10})
        await getContentfulCollection(func)
        expect(func).toHaveBeenCalledTimes(5)
    })

    it('calls collection function with query value on every iteration', async () => {
        const func = jest.fn().mockResolvedValue({items: [1, 2], total: 10})
        await getContentfulCollection(func, {hello: 'world', limit: 2})
        expect(func).toHaveBeenLastCalledWith({hello: 'world', limit: 2, skip: 8})
    })

    it('fails with error', async () => {
        const error = 'expected error'
        const func = jest.fn().mockRejectedValue(error)
        await expect(getContentfulCollection(func)).rejects.toMatch(error)
    })

})

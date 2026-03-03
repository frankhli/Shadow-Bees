"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPrisma = void 0;
exports.mockPrisma = {
    hotel: {
        findMany: async () => [
            {
                id: '1',
                name: '跳海 Living',
                nameEn: 'Tiaohai Living',
                city: '北京',
                address: '北京市朝阳区',
                hasForeignGuestLicense: true,
                basePrice: 299,
                currency: 'CNY',
                facilities: { wifi: true, elevator: true, westernToilet: true },
                roomTypes: [
                    { id: '1', name: '标准间', nameEn: 'Standard Room', inventoryPool: { ota: 5, direct: 3 } }
                ]
            },
            {
                id: '2',
                name: '胡同小院',
                nameEn: 'Hutong Courtyard',
                city: '北京',
                address: '北京市东城区',
                hasForeignGuestLicense: true,
                basePrice: 399,
                currency: 'CNY',
                facilities: { wifi: true, elevator: false, westernToilet: true },
                roomTypes: []
            }
        ],
        findUnique: async ({ where }) => ({
            id: where.id,
            name: '示例酒店',
            city: '北京',
            roomTypes: []
        }),
        create: async ({ data }) => ({ id: 'new-id', ...data }),
        count: async () => 2,
    },
    order: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async ({ data }) => ({ id: 'order-id', ...data }),
        update: async () => ({}),
        updateMany: async () => ({ count: 1 }),
        count: async () => 0,
    },
    user: {
        findUnique: async () => null,
        create: async ({ data }) => ({ id: 'user-id', ...data }),
    },
    inventorySyncLog: {
        findMany: async () => [],
    },
    $connect: async () => { },
    $disconnect: async () => { },
};
//# sourceMappingURL=mock-prisma.js.map
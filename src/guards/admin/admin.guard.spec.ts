import { AdminGuard } from './admin.guard';

describe('IsAdminGuard', () => {
  it('should be defined', () => {
    expect(new AdminGuard()).toBeDefined();
  });
});

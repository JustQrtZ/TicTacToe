using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace TicTacToe.Data.Abstract
{
    public interface IEntityBaseRepository<T> where T : class
    {
        IEnumerable<T> AllIncluding(
            params Expression<Func<T, object>>[] includeProperties
        );
        IEnumerable<T> GetAll();
        int Count();
        T GetSingle(Expression<Func<T, bool>> predicate);
        T GetSingle(
            Expression<Func<T, bool>> predicate,
            params Expression<Func<T, object>>[] includeProperties
        );
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteWhere(Expression<Func<T, bool>> predicate);
        void Commit();
    }
}